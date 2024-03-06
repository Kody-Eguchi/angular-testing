import { UserInterface } from "../types/user.interface";
import { UserService } from "./users.service";
import { TestBed } from '@angular/core/testing';
import { UtilsService } from "./utils.service";
describe('UserService', () => {
  let userService: UserService;

  const utilsServiceMock = {
    pluck: jest.fn(),

  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UtilsService, useValue: utilsServiceMock}],
    });

    userService = TestBed.inject(UserService);
  });
  it('create a service', () => {
    expect(userService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user:UserInterface = {
        id: '3',
        name: 'foo'
      }
      userService.addUser(user);
      expect(userService.users).toEqual([{id: '3', name: 'foo'}])
    })
  })

  describe('removeUser', () => {
    it('should remove a user', () => {
      userService.users = [{ id: '3', name: 'foo'}];
      userService.removeUser('3');
      expect(userService.users).toEqual([]);
    })
  })

  describe('getUsernames', () => {
    it('should get usernames', () => {
      utilsServiceMock.pluck.mockReturnValue(['foo'])
      expect(userService.getUsernames()).toEqual(['foo']);
    })
  })

});
