using OneCore.Business.ContractBusiness;
using OneCore.Core.ViewModel;
using OneCore.Data.Entities;
using OneCore.Data.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OneCore.Business
{
    public class UserBusiness : IUserBusiness
    {
        private readonly IUnityOfWork unityOfWork;


        public UserBusiness(IUnityOfWork unityOfWork)
        {
            this.unityOfWork = unityOfWork;
        }

        public async Task<int> Add(UserViewModel user)
        {
            var userModel = new User
            {
                id = user.Id,
                user1 = user.User,
                password = user.Password,
                creationDate = user.CreationDate,
                email = user.Email,
                sexo = user.Gender == Core.Enum.Gender.Male ? true : false,
                status = user.Status == Core.Enum.Status.Active ? true : false
            };

            unityOfWork.User.Add(userModel);
            var result = await unityOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<int> Delete(int id)
        {
            var student = await unityOfWork.User.GetAsync(id);
            unityOfWork.User.Remove(student);
            return await unityOfWork.SaveChangesAsync();
        }

        public async Task<List<UserViewModel>> GetAll()
        {
            var listStudent = await unityOfWork.User.GetAllAsync();

            return listStudent.Select(u => new UserViewModel
            {
                Id = u.id,
                User = u.user1,
                Password = u.password,
                CreationDate = u.creationDate ?? DateTime.Now,
                Email = u.email,
                Gender = u.sexo.Value ? Core.Enum.Gender.Male : Core.Enum.Gender.Female,
                Status = u.status.Value ? Core.Enum.Status.Active : Core.Enum.Status.Inactive,
            }).ToList();
        }

        public async Task<int> Update(UserViewModel user)
        {
            var userViewModel = new User
            {
                id = user.Id,
                user1 = user.User,
                password = user.Password,
                creationDate = user.CreationDate,
                email = user.Email,
                sexo = user.Gender == Core.Enum.Gender.Male ? true : false,
                status = user.Status == Core.Enum.Status.Active ? true : false
            };

            unityOfWork.User.Update(userViewModel);
            return await unityOfWork.SaveChangesAsync();
        }
    }
}
