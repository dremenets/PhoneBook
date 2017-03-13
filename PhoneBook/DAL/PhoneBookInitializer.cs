using System.Data.Entity;

namespace PhoneBook.DAL
{
    public class PhoneBookInitializer : CreateDatabaseIfNotExists<PhoneBookContext>
    {

    }
}