using PhoneBook.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace PhoneBook.Controllers
{
    public class ContactsController : ApiController
    {
        [Route("api/contacts")]
        public List<Contact> GetContacts()
        {
            var people = new List<Contact>()
            {
                new Contact { FullName = "FIO1", Email = "222@gmail.com", BirthDate = DateTime.Now, Phone = "89073711232"},
                new Contact { FullName = "FIO2", Email = "111@gmail.com", BirthDate = DateTime.Now, Phone = "89073785232"},
                new Contact { FullName = "FIO3", Email = "333@gmail.com", BirthDate = DateTime.Now, Phone = "89073781232"}
            };

            return people;
        }
    }
}
