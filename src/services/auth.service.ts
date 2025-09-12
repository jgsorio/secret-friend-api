import { today } from '@/utils/functions';
class AuthService {
  validatePassword = (password: string): boolean => {
    return password === today();
  }

  createToken = (): string => {
    return process.env.API_TOKEN + today();
  }
}

export default new AuthService();
