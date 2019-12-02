import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    // Complete the plusMinus function below.
    static double roundAvoid(double value, int places) {
    double scale = Math.pow(10, places);
    return Math.round(value * scale) / scale;
    }

  // Complete the plusMinus function below.
    static void plusMinus(int[] arr) {
        int n = arr.length;
        int pos = 0, neg = 0, zer = 0;

        for(int x = 0; x < arr.length; x++){
            if(arr[x] > 0){
                pos += 1;
            }
            else if(arr[x] < 0){
                neg += 1;
            }
            else if(arr[x] == 0)
            {
                zer += 1;
            }
        }
        
        double posDecimal = Double.valueOf(pos) / n;
        double negDecimal = Double.valueOf(neg) / n;
        double zerDecimal = Double.valueOf(zer) / n;

        System.out.println(roundAvoid(posDecimal, 5));
        System.out.println(roundAvoid(negDecimal, 5));
        System.out.println(roundAvoid(zerDecimal, 5));
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int n = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int[] arr = new int[n];

        String[] arrItems = scanner.nextLine().split(" ");
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int i = 0; i < n; i++) {
            int arrItem = Integer.parseInt(arrItems[i]);
            arr[i] = arrItem;
        }

        plusMinus(arr);

        scanner.close();
    }
}

