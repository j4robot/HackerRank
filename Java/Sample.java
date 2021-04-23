import java.util.*;

public class Sample {

    public static void main(String[] args) {
        int i = 4;
        double d = 4.0;
        String s = "HackerRank ";

        Scanner scan = new Scanner(System.in);

        /* Declare second integer, double, and String variables. */
        int iNumber = 0;
        double dNumber = 0.0;
        String variab = "";
        /* Read and save an integer, double, and String to your variables. */
        // Note: If you have trouble reading the entire String, please go back and
        // review the Tutorial closely.
        //
        System.out.print("Enter the string: ");
        variab = scan.nextLine();
        System.out.println("Enter the integer");
        iNumber = scan.nextInt();
        System.out.println("Enter the decimal number");
        dNumber = scan.nextDouble();

        /* Print the sum of both integer variables on a new line. */
        System.out.println(iNumber + i);
        /* Print the sum of the double variables on a new line. */
        System.out.println(round(dNumber + d, 1));
        /*
         * Concatenate and print the String variables on a new line; the 's' variable
         * above should be printed first.
         */
        System.out.println(s.concat(variab));

        scan.close();
    }

    private static double round (double value, int precision) {
        int scale = (int) Math.pow(10, precision);
        return (double) Math.round(value * scale) / scale;
    }
}