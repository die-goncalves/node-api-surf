import { Controller, Post } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/models/user';

@Controller('users')
export class UsersController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try{
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    }catch(error){
      res.status(400).send({error: error.message});
    }
  }
}