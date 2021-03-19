import { Request, Response } from 'express';
import { Container, Service } from 'typedi';

@Service()
class HomeController {
  home = async (_req: Request, res: Response): Promise<Response> => {
    return res.json({});
  };
}

export const { home } = Container.get(HomeController);
