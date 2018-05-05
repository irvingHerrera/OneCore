using OneCore.Data.Entities;
using System.Threading.Tasks;

namespace OneCore.Data.RepositoryContract
{
    public interface IUnityOfWork
    {
        Task<int> SaveChangesAsync();
    }
}
