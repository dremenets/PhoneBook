using CsvHelper;
using PhoneBook.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace PhoneBook.Helpers
{
    public class CsvHelper
    {
        public static List<Contact> Read(TextReader reader)
        {
            var result = new List<Contact>();
            var csv = new CsvReader(reader);
            csv.Configuration.Delimiter = "    ";

            while (csv.Read())
            {
                var fullName = csv.GetField<string>(0);
                var email = csv.GetField<string>(1);
                var phone = csv.GetField<string>(2);
                var birthday = csv.GetField<DateTime>(3);

                result.Add(new Contact
                {
                    FullName = fullName,
                    Email = email,
                    Phone = phone,
                    BirthDate = birthday
                });
            }

            return result;
        }

        public static byte[] Write(List<Contact> contacts)
        {
            using (var fs = new MemoryStream())
            {
                using (TextWriter tx = new StreamWriter(fs))
                {
                    var csv = new CsvWriter(tx);
                    csv.Configuration.Delimiter = "    ";

                    foreach (var contact in contacts)
                    {
                        csv.WriteRecord(contact);
                    }

                    return fs.ToArray();
                }
            }
        }
    }
}