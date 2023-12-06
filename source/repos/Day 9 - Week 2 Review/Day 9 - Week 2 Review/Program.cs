

// 1 ARRAY
// Create an int array
// Fill it with some numbers
//loop thru the numbers and display all to console


string[] array = { "fee", "fi", "fo", "fum" };
foreach (string a in array)
{ Console.WriteLine(a); }

//or
for (int a = 0; a < array.Length; a++)
{
    Console.WriteLine(array[a]);
}


int[] numbers = { 1, 10, 8, 4, 20 };
for (int i = 0; i < numbers.Length + 1; i++)
{
    Console.WriteLine(i);
}

//or
foreach (int n in numbers)
{
    Console.WriteLine(n);
}

// 2 
// Ask the user for a sentence. Save it in a string
// Split the sentence into an array of words (strings)
// Display each word in console

Console.WriteLine("Write me a sentence.");
string sentence = Console.ReadLine().ToLower().Trim();
string[] splitWords = sentence.Split(' ');

foreach (string word in splitWords)
{ Console.WriteLine(word); }



// 3
// Make a method called AvgArray
// take in a double array
// retrun a double
// find the average of the values in the array and return it

double[] array2 = { 1, 3, 3, 4 };
AvgArray2(array2);
Console.WriteLine($"The average of array2 in the list is: {AvgArray2(array2)}");
static double AvgArray2(double[] array2)
{
    double sum = 0;
    foreach (double d in array2)
    {
        sum += d;
    }
    double average = sum / array2.Length;
    //Console.WriteLine($"the average of the Array2 is: {average}");
    return average;
}

double[] nums = { 1, 5, 8, 9, 22 };
Console.WriteLine($"The average of the numbers in the list is: {AvgArray(nums)}");
static double AvgArray(double[] values)
{

    //return values.Average();

    double sum = 0;
    double count = 0;
    foreach (double v in values)
    {

        count++;
        sum += v;

    }
    return sum / count;
}

// 4 
// create a method called FindIndex
// take in a string list and a string
// return an int
// look thru the string list and return the index of the string perameter
// if not found return -1

List<int> numeros = new List<int> { 2, 5, 1, 7, 4 };
Console.WriteLine($"El indice del numero 1 esta en la {FindNumeroIndex(numeros, 1)} posicion!");

static int FindNumeroIndex(List<int> primero, int n)
{
    int index = -1;
    for (int i = 0; i < primero.Count; i++)
    {
        if (primero[i] == n)
        {
            index = i;
        }
    }
    if (index == primero.Count - 1)
    {
        Console.WriteLine("Esto numero esta al final de la lista! "); //at the end of the list
    }
    if (index == primero.Count / 2)
    {
        Console.WriteLine("Esto numero esta al media de la lista! "); //in the middle of the list
    }
    if (index == 0)
    {
        Console.WriteLine("Esto numero esta al inicio de la lista! "); //at the beginning of the list
    }
    return index;
}

List<string> yummyMeats = new List<string> { "sausage", "bacon", "steak", "chicken" };
Console.WriteLine($"The word 'chicken' is found at index {FindIndex2(yummyMeats, "chicken")}");

static int FindIndex2(List<string> meat, string word)
{
    int indexOfMeat = -1;
    for (int i = 0; i < meat.Count; i++)
    {
        if (meat[i] == word)
        {
            indexOfMeat = i;
        }
    }
    return indexOfMeat;
}


List<string> breakfast = new List<string> { "eggs", "bacon", "oatmeal", "cereal", "sausage", "toast" };
Console.WriteLine($"The word 'bacon' is found at index {FindIndex(breakfast, "bacon")}");

static int FindIndex(List<string> values, string word)
{
    // return strings.FindIndex(s => s == input);

    int index = -1;
    for (int i = 0; i < values.Count; i++) //.count is for lists
    {
        if (values[i] == word)
        {
            index = i;
        }
    }
    return index;
}

//.count is for lists
//.length is for arrays and strings