using OneCore.Data.Context;
using OneCore.Data.Entities;
using OneCore.Data.RepositoryContract;
using System;
using System.Threading.Tasks;

namespace OneCore.Data.Repository
{
    public class UnityOfWork : IUnityOfWork, IDisposable
    {
        private readonly OneCoreEntities context;
        private IRepository<User> _user;

        public UnityOfWork(OneCoreEntities context)
        {
            this.context = context;
        }

        public IRepository<User> User
        {
            get
            {

                if (this._user == null)
                {
                    this._user = new Repository<User>(context);
                }
                return this._user;
            }
        }

        public void Dispose()
        {
            this.context.Dispose();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
