using Deck_of_Cards_Lab.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Deck_of_Cards_Lab.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        //[HttpGet]
        //public IActionResult Play()
        //{

        //    return View();
        //}
        //[HttpPost]
        public IActionResult Play()
        {
            DeckofCardsModel result = DeckofCardsDAL.Draw5Cards();
            if (result.remaining <= 4)

            {
                DeckofCardsDAL.Reshuffle();
            }
            return View(result);
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}