function traverseGrid(grid, start){
    let column = start
  
    for(let row = 0; row < grid.length; row++){
      //ball right movement
      if(grid[row][column] === 1){
        //check if end of the row has been reached
        if(column < grid[row].length){
          return false
        }
        if(grid[row][column + 1] === 0){
          return false
        }
        column++

      }
        //movement to the left
      else{
        if(column === 0){
          return false
        }
        if(grid[row][column - 1] === 1){
          return false
        }
        column--
      }
    }
    return column
  }
  
  let grid = [[0,1,0,1],
              [1,0,1,0],
              [0,0,0,0],
              [1,1,1,1]]
  console.log(traverseGrid(grid,0))