//Pajama Party Planner

//Create a Pajama Party Planner application that allows users to manage their pajama party arrangements.
//The application should have the following features:

//Pajama Sets Catalog:
//Implement a catalog of different pajama sets that users can choose from.
//Each pajama set should have attributes such as style, size, and color.
//Guest List Management:

//Users should be able to create and manage a guest list for the pajama party.
//Each guest entry should include details like name, age, and pajama size.
//Party Agenda:

//Allow users to schedule activities for the pajama party, such as movie time, games, and snacks.
//Provide a view of the agenda with scheduled activities and timings.
//RSVP System:

//Implement an RSVP system where guests can confirm their attendance and specify any dietary restrictions or preferences.
//Pajama Party Dashboard:

//Create a dashboard that gives an overview of the party details, including the number of guests attending,
//scheduled activities, and pajama sets selected.
//Bonus:

//Implement a feature to automatically suggest pajama sets based on the guest's preferences.
//Allow users to share the party details via a unique link with their guests.
//Create a reminder system for scheduled activities.
//Feel free to choose any programming language or framework for this challenge. Consider the user experience,
//data structure efficiency, and code modularity in your solution.

//You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

//Merge nums1 and nums2 into a single array sorted in non-decreasing order.

//The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.



//Example 1:

//Input: nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
//Output: [1,2,2,3,5,6]
//Explanation: The arrays we are merging are [1,2,3] and[2, 5, 6].
//The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
//Example 2:

//Input: nums1 = [1], m = 1, nums2 = [], n = 0
//Output: [1]
//Explanation: The arrays we are merging are [1] and[].
//The result of the merge is [1].
//Example 3:

//Input: nums1 = [0], m = 0, nums2 = [1], n = 1
//Output: [1]
//Explanation: The arrays we are merging are [] and[1].
//The result of the merge is [1].
//Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.


//Constraints:
//nums1.length == m + n
//nums2.length == n
//0 <= m, n <= 200
//1 <= m + n <= 200
//- 109 <= nums1[i], nums2[j] <= 109

using System.ComponentModel.DataAnnotations;

int[] nums1 = { 1, 2, 3, 0, 0, 0 };
int[] nums2 = { 2, 5, 6 };
int m = 3;
int n = 3;
Merge(nums1, m, nums2, n);
CombineArray(nums1);

    static void Merge(int[] nums1, int m, int[] nums2, int n)
{
    int index = m + n - 1;  // Index to merge from the end of nums1
    m--;  // Adjusting m to point to the last element in nums1

    while (n > 0)
    {
        // Compare the last elements of nums1 and nums2, and add the larger one to the end of nums1
        if (m >= 0 && nums1[m] > nums2[n - 1])
        {
            nums1[index] = nums1[m];
            m--;
        }
        else
        {
            nums1[index] = nums2[n - 1];
            n--;
        }
        index--;
    }
}

static void CombineArray(int[] arr)
{
    Console.Write("Merged Array: ");
    for (int i = 0; i < arr.Length; i++)
    {
        Console.Write($"{arr[i]}, ");
    }
}