import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import { User } from "../entities/User";

const mapErrors = (errors: Object[]) => {
    return errors.reduce((prev: any, err: any) => {
        prev[err.property] = Object.entries(err.constraints)[0][1];
        return prev;
    }, {})
}

const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    try {
        let errors: any = {};
        const emailUser = await User.findOneBy({ email });
        const usernameUser = await User.findOneBy({ username });
        if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
        if (usernameUser) errors.uername = "이미 이 사용자 이름이 사용되었습니다.";

        if (Object.keys(errors).length > 0) return res.status(400).json(errors);
        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;

        errors = await validate(user);
        await user.save();
        if (errors.length > 0) return res.status(400).json(mapErrors(errors));
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const router = Router();
router.post('/register', register)

export default router;