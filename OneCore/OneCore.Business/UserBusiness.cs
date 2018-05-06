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

        #region Metodos privados

        private UserViewModel GetViewMode(User user)
        {
            return new UserViewModel
            {
                Id = user.id,
                User = user.userSystem,
                Password = user.password,
                CreationDate = user.creationDate ?? DateTime.Now,
                Email = user.email,
                Gender = user.sexo.Value ? Core.Enum.Gender.Male : Core.Enum.Gender.Female,
                Status = user.status.Value ? Core.Enum.Status.Active : Core.Enum.Status.Inactive,
            };
        }

        private User GetModel(UserViewModel viewModel)
        {
            return new User
            {
                id = viewModel.Id,
                userSystem = viewModel.User,
                password = viewModel.Password,
                creationDate = DateTime.Now,
                email = viewModel.Email,
                sexo = viewModel.Gender == Core.Enum.Gender.Male ? true : false,
                status = viewModel.Status == Core.Enum.Status.Active ? true : false,
            };
        }

        #endregion

        public UserBusiness(IUnityOfWork unityOfWork)
        {
            this.unityOfWork = unityOfWork;
        }

        public async Task<ResponseViewModel<UserViewModel>> Add(UserViewModel user)
        {
            var result = new ResponseViewModel<UserViewModel>();

            try
            {
                var userModel = GetModel(user);

                unityOfWork.User.Add(userModel);

                if (await unityOfWork.SaveChangesAsync() == 1)
                {
                    result.Message = "Se ha registrado exitosamente, ya puede iniciar sesión";
                    result.Success = true;
                    result.Objeto = user;
                }
                else
                {
                    result.Message = "Ocurrió un error al registrar el usuario";
                    result.Success = false;
                    result.Objeto = user;
                }
            }
            catch (Exception ex)
            {
                result.Message = "Ocurrió un error al registrar el usuario";
                result.Success = false;
                result.Objeto = user;
            }

            return result;
        }

        public async Task<ResponseViewModel<UserViewModel>> Delete(int id)
        {
            var result = new ResponseViewModel<UserViewModel>();

            var user = await unityOfWork.User.GetAsync(id);
            unityOfWork.User.Remove(user);

            if (await unityOfWork.SaveChangesAsync() == 1)
            {
                result.Message = "";
                result.Success = true;
            }
            else
            {
                result.Message = "";
                result.Success = false;
            }

            return result;
        }

        public async Task<ResponseViewModel<UserViewModel>> Get(int id)
        {
            var result = new ResponseViewModel<UserViewModel>();
            try
            {
                var user = await unityOfWork.User.GetAsync(id);
                var userViewModel = GetViewMode(user);

                result.Message = "";
                result.Success = true;
                result.Objeto = userViewModel;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public ResponseViewModel<List<UserViewModel>> GetAll()
        {
            var listUser = unityOfWork.User.GetAllAsync();
            var result = new ResponseViewModel<List<UserViewModel>>();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Objeto = listUser.Select(u => GetViewMode(u)).ToList();
                
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public ResponseViewModel<UserViewModel> Login(UserViewModel user)
        {
            var listUser = unityOfWork.User.GetAllAsync();

            var result = new ResponseViewModel<UserViewModel>();

            if (listUser.Any(lst => lst.userSystem.Equals(user.User) && lst.password.Equals(user.Password)))
            {
                var userEntiti = listUser
                                .FirstOrDefault(lst => lst.userSystem.Equals(user.User)
                                                && lst.password.Equals(user.Password));

                var userViewModel = GetViewMode(userEntiti);

                result.Message = "Bienvenido";
                result.Success = true;
                result.Objeto = userViewModel;
            }
            else
            {
                result.Message = "El usuario o contraseña son incorrectos";
                result.Success = false;
            }
                

            return result;
        }

        public async Task<ResponseViewModel<UserViewModel>> Update(UserViewModel user)
        {
            var userViewModel = GetModel(user);
            var result = new ResponseViewModel<UserViewModel>();

            unityOfWork.User.Update(userViewModel);

            if (await unityOfWork.SaveChangesAsync() == 1)
            {
                result.Message = "El usuario ha sido modificado exitosamente";
                result.Success = true;
            }
            else
            {
                result.Message = "Ocurrió un problema al actualizar el usuario";
                result.Success = false;
            }

            return result;
        }
    }
}
