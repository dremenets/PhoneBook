using PhoneBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using PhoneBook.DAL;
using PhoneBook.DAL.Interfaces;
using PhoneBook.Helpers;

namespace PhoneBook.Controllers
{
    public class ContactsController : ApiController
    {
        private readonly IGenericRepository<Contact> _genericRepository = new EFGenericRepository<Contact>();

        [HttpGet]
        [Route("api/contacts/{id}")]
        public Contact Get(int id)
        {
            return _genericRepository.FindById(id);
        }

        [HttpGet]
        [Route("api/contacts")]
        public List<Contact> GetContacts()
        {
            return _genericRepository.Get().ToList();
        }

        [HttpPost]
        [Route("api/contacts/upload")]
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            try
            {
                string csvContent = await GetCsvContent();
                var contacts = PhoneBookCsvHelper.Read(csvContent);
                _genericRepository.Create(contacts);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpGet]
        [Route("api/contacts/download")]
        public HttpResponseMessage Download()
        {
            try
            {
                var contacts = _genericRepository.Get().ToList();
                var bytes = PhoneBookCsvHelper.Write(contacts);
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new ByteArrayContent(bytes);
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
                response.Content.Headers.ContentDisposition.FileName = "contacts.csv";
                return response;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpDelete]
        [Route("api/contacts/delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var item = _genericRepository.FindById(id);
            if (item == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            else
            {
                _genericRepository.Remove(item);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        [HttpPut]
        [Route("api/contacts/edit")]
        public Contact Put([FromBody] Contact item)
        {
            _genericRepository.Update(item);
            return _genericRepository.FindById(item.Id);
        }

        [HttpPost]
        [Route("api/contacts/create")]
        public Contact Post([FromBody] Contact item)
        {
            _genericRepository.Create(item);
            return _genericRepository.FindById(item.Id);
        }

        private async Task<string> GetCsvContent()
        {
            string csvContent = null;
            MultipartMemoryStreamProvider provider = await Request.Content.ReadAsMultipartAsync();
            var content = provider.Contents.Last();
            HttpContentHeaders headers = content.Headers;

            if (headers != null && headers.ContentDisposition != null && headers.ContentDisposition.FileName != null)
            {
                byte[] buffer = await content.ReadAsByteArrayAsync();
                byte[] byteArray = buffer.ToArray();
                csvContent = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);
            }
            return csvContent;
        }
    }
}