class Main {
  public static void main(String[] args) {
    System.out.println(numberWeird(18));
  }

  private static String numberWeird(int num){
    if(num % 2 == 0 && (num >= 2 && num <= 5)){
      return "Not Weird";
    }
    else if(num % 2 == 0 && (num >= 6 && num <= 20)){
      return "Weird";
    }
    else if(num % 2 == 0 && num > 20){
      return "Not Weird";
    }
    return "Weird";
  }
}
