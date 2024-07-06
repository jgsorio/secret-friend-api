import { getToday } from "../helpers/getToday";

class AuthService {
    validatePassword = async (password: string): Promise<boolean> => {
        return password === getToday();
    }

    createToken = async (): Promise<string> => {
        return `Bearer ${process.env.TOKEN}${getToday()}`;
    }
}

export default new AuthService();
