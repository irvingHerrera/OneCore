using OneCore.Data.Context;
using OneCore.Data.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneCore.Data.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected OneCoreEntities context;
        protected DbSet<TEntity> dbset;

        public Repository(OneCoreEntities context)
        {
            this.context = new OneCoreEntities();
            this.dbset = context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            dbset.Add(entity);
        }

        public async Task<TEntity> GetAsync(int id)
        {
            return await dbset.FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            IQueryable<TEntity> query = dbset;
            return await query.ToListAsync();
        }

        public void Remove(TEntity entity)
        {
            dbset.Remove(entity);
        }

        public void Update(TEntity entityToUpdate)
        {
            dbset.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}
