using CsvHelper;
using PhoneBook.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace PhoneBook.Helpers
{
    public class PhoneBookCsvHelper
    {
        private const string SEPARATOR = "\t";

        public static List<Contact> Read(string content)
        {
            var result = new List<Contact>();
            using (TextReader textReader = new StringReader(content))
            {
                var csv = new CsvReader(textReader);
                csv.Configuration.Delimiter = SEPARATOR;

                while (csv.Read())
                {
                    var fullName = csv.GetField<string>(0);
                    var email = csv.GetField<string>(3);
                    var phone = csv.GetField<string>(2);
                    var birthday = csv.GetField<DateTime>(1);

                    result.Add(new Contact
                    {
                        FullName = fullName,
                        Email = email,
                        Phone = phone,
                        BirthDate = birthday
                    });
                }
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
                    csv.Configuration.Delimiter = SEPARATOR;

                    csv.WriteField("FullName");
                    csv.WriteField("BirthDate");
                    csv.WriteField("Phone");
                    csv.WriteField("Email");
                    csv.NextRecord();

                    foreach (var contact in contacts)
                    {
                        csv.WriteField(contact.FullName);
                        csv.WriteField(contact.BirthDate);
                        csv.WriteField(contact.Phone);
                        csv.WriteField(contact.Email);
                        csv.NextRecord();
                    }
                }

                return fs.ToArray();
            }
        }
    }
}