using App.Utils;
using Hafintech.API.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Hafintech.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public long UserID { get; set; }

        /// <summary>
        /// 0: web, 1:android, 2:ios, 3:fb web, 4: fb android, 5: fb ios
        /// </summary>
       // public int SourceID { get; set; }

        public string FullName { get; set; } = string.Empty;
        public string Identity { get; set; } = string.Empty;
        public string Info { get; set; } = "info";

        //public bool IsOTP { get; set; } = false;
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            try
            {
                // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
                var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
                userIdentity.AddClaim(new Claim("Info", Info));
                //userIdentity.AddClaim(new Claim("AccessToken", AccessToken));
                // Add custom user claims here
                return userIdentity;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return null;
            }
        }

        internal Task<ClaimsIdentity> GenerateUserIdentityAsync(object userManager, string v)
        {
            throw new NotImplementedException();
        }
    }

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create()
        {
            var manager = new ApplicationUserManager(new ApplicationUserStore());
            return manager;
        }
    }
}

public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
{
    public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager)
        : base(userManager, authenticationManager)
    {
    }

    public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
    {
        return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager, DefaultAuthenticationTypes.ApplicationCookie);
    }

    public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
    {
        return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
    }
}

public class ApplicationUserStore : IUserStore<ApplicationUser>
{
    // private CustomDbContext database;

    public ApplicationUserStore()
    {
        // this.database = new CustomDbContext();
    }

    public void Dispose()
    {
        // this.database.Dispose();
    }

    public Task CreateAsync(ApplicationUser user)
    {
        // TODO
        throw new NotImplementedException();
    }

    public Task UpdateAsync(ApplicationUser user)
    {
        // TODO
        throw new NotImplementedException();
    }

    public Task DeleteAsync(ApplicationUser user)
    {
        // TODO
        throw new NotImplementedException();
    }

    public Task<ApplicationUser> FindByIdAsync(string userId)
    {
        //var user = new ApplicationUser();
        //user.Id = AccountSession.AccountID.ToString();
        //user.UserID = AccountSession.AccountID;
        //user.UserName = AccountSession.AccountName;
        //user.AccessToken = AccountSession.AccessToken;
        //var task = Task<ApplicationUser>.Factory.StartNew(() =>
        //{
        //    return user;
        //});
        //return task;
        throw new NotImplementedException();
    }

    public Task<ApplicationUser> FindByNameAsync(string userName)
    {
        throw new NotImplementedException();
    }
}