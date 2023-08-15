using static System.Net.WebRequestMethods;
using System.Net;
using Newtonsoft.Json;

namespace Deck_of_Cards_Lab.Models
{
    public class DeckofCardsDAL
    {
        public static DeckofCardsModel Draw5Cards()//adjust- use correct model, update method name
        {	//adjust
            //setup
            string deckID = "i6bdww7srht5";
            string url = $"https://deckofcardsapi.com/api/deck/{deckID}/draw/?count=5";//link to Deck ID

            //request data
            HttpWebRequest request = WebRequest.CreateHttp(url); //takes the url and calls the website and saves the call
            HttpWebResponse response = (HttpWebResponse)request.GetResponse(); //saves the response
            //converting to JSON
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string json = reader.ReadToEnd(); //takes all the info and saves it into a single string to use in our objects

            //adjust
            //converting to C#
            //right click on JsonConvert. > install Newtonsoft.json
            DeckofCardsModel result = JsonConvert.DeserializeObject<DeckofCardsModel>(json);//json is the string name
            return result;

        }

        public static DeckofCardsModel Reshuffle()//adjust- use correct model, update method name
        {	//adjust
            //setup
            string deckID = "i6bdww7srht5";
            string url = $"https://deckofcardsapi.com/api/deck/{deckID}/shuffle/";//link to Deck ID

            //request data
            HttpWebRequest request = WebRequest.CreateHttp(url); //takes the url and calls the website and saves the call
            HttpWebResponse response = (HttpWebResponse)request.GetResponse(); //saves the response
            //converting to JSON
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string json = reader.ReadToEnd(); //takes all the info and saves it into a single string to use in our objects

            //adjust
            //converting to C#
            //right click on JsonConvert. > install Newtonsoft.json
            DeckofCardsModel result = JsonConvert.DeserializeObject<DeckofCardsModel>(json);//json is the string name
            return result;

        }

    }
}
