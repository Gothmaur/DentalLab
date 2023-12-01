import { User } from "../models/Users";

export class UserMockService{
    private usuarios: User[] = [
        {
          id: 1,
          nombre:'Falso',
          apellido1:'Falso',
          apellido2:'Falso',
          email: 'Falso@Falso',
          telefono: '0011223344',
          direccion: 'falso falso',
          clave: 'Falso',
          token: ''
        }
      ];
      
        getUsers(): User[]{
          return this.usuarios;
        }
        
}
