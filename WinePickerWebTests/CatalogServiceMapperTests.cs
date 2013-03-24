using System.Reflection;
using NUnit.Framework;
using WineApi;
using WinePickerWeb.Mappers;

namespace WinePickerWebTests
{
    [TestFixture]
    internal class CatalogServiceMapperTests
    {
        // ReSharper disable InconsistentNaming

        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {
            Config.ApiKey = "MY_TEST_APIKEY_VALUE";
        }

        [Test]
        public void ConfigureWithSearchCriteria_GivenSearchTermWithOneWord_AddsTheCorrectSearchTermToTheUrl()
        {
            // Arrange
            var catalogService = new CatalogService();

            // Act
            CatalogServiceMapper.ConfigureWithSearchCriteria(catalogService, "s:word");
            var url = ReadPrivateUrlFieldOfServiceBase(catalogService);

            // Assert
            Assert.That(url, Is.StringContaining("&search=word"));
        }

        [Test]
        public void ConfigureWithSearchCriteria_GivenSearchTermWithTwoWords_AddsTheCorrectSearchTermToTheUrl()
        {
            // Arrange
            var catalogService = new CatalogService();

            // Act
            CatalogServiceMapper.ConfigureWithSearchCriteria(catalogService, "s:word1 word2");
            var url = ReadPrivateUrlFieldOfServiceBase(catalogService);

            // Assert
            Assert.That(url, Is.StringContaining("&search=word1+word2"));
        }

        [Test]
        public void ConfigureWithSearchCriteria_GivenSearchTermWithTwoWordsAndExtraneousWhitespace_AddsTheCorrectSearchTermToTheUrl()
        {
            // Arrange
            var catalogService = new CatalogService();

            // Act
            CatalogServiceMapper.ConfigureWithSearchCriteria(catalogService, "s:\t  word1   \t word2  \t ");
            var url = ReadPrivateUrlFieldOfServiceBase(catalogService);

            // Assert
            Assert.That(url, Is.StringContaining("&search=word1+word2"));
        }

        private string ReadPrivateUrlFieldOfServiceBase(ServiceBase serviceBase)
        {
            var serviceBaseType = typeof (ServiceBase);
            var fieldInfo = serviceBaseType.GetField("_url", BindingFlags.NonPublic | BindingFlags.Instance);
            if (fieldInfo != null)
            {
                return fieldInfo.GetValue(serviceBase) as string;
            }

            return null;
        }
    }
}
