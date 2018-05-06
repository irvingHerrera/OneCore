using OneCore.Core.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OneCore.Business.ContractBusiness
{
    public interface IUserBusiness
    {
        Task<ResponseViewModel<UserViewModel>> Add(UserViewModel user);
        Task<ResponseViewModel<UserViewModel>> Get(int id);
        Task<ResponseViewModel<List<UserViewModel>>> GetAll();
        Task<ResponseViewModel<UserViewModel>> Delete(int id);
        Task<ResponseViewModel<UserViewModel>> Update(UserViewModel user);
        Task<ResponseViewModel<UserViewModel>> Login(UserViewModel user);
    }
}
