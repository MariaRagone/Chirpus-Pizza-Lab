using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Practice_5.Models;
using System.Diagnostics;

namespace Practice_5.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private SccstudentDbContext _SccstudentDbContext = new SccstudentDbContext();
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AllStudents()
        {
            List<Student> result = _SccstudentDbContext.Students.ToList();

            return View(result);
        }

        public IActionResult Grades(Student s)
        {
            return View(s);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}