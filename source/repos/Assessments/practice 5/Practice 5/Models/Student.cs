using System;
using System.Collections.Generic;

namespace Practice_5.Models;

public partial class Student
{
    public int Id { get; set; }

    public string? Img { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public double? PercentGrade { get; set; }

    public string? LetterGrade { get; set; }

    public double? Gpa { get; set; }

    public bool? Passing { get; set; }
}
