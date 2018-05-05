using OneCore.Core.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OneCore.Business.ContractBusiness
{
    public interface IUserBusiness
    {
        Task<int> Add(UserViewModel user);
        Task<List<UserViewModel>> GetAll();
        Task<int> Delete(int id);
        Task<int> Update(UserViewModel user);
    }
}
