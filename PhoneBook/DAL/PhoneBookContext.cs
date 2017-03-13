using PhoneBook.Models;
using System.Data.Entity;

namespace PhoneBook.DAL
{
    public class PhoneBookContext : DbContext
    {
        public PhoneBookContext() : base("PhoneBook")
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}