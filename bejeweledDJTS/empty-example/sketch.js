var grid;
var activeRect = [];
var result = 0;
const distanceBetweenRect = 50;
const sizeRect = 49;


// ########SETUP########
function setup() {
    createCanvas(600, 600);
    grid = createEmptyGrid(12);
    fillEmptyRect(grid);
    updateGrid(grid);
    result = 0;
    document.getElementById("score").innerHTML = 0;
}

function createEmptyGrid(dimension)
{
    let grid = [];

    for (let i = 0; i < dimension; i++)
    {
        const row = [];
        for (let j = 0; j < dimension; j++)
        {
            row.push([""]);
        }
        grid.push(row);
    }
    return grid;
}

//########VIEW########
function draw()
{
    for (let i = 0; i < grid[0].length; i++)
    {
        for (let j = 0; j < grid.length; j++)
        {
            fill(grid[j][i]);
            rect(i * distanceBetweenRect, j * distanceBetweenRect, sizeRect, sizeRect);
        }
    }
}




//########CONTROLLER########
function mouseClicked()
{
    var currentRect = getRectIndexAtLocation({x: mouseX, y: mouseY});

    if (currentRect == undefined)
        return;

    if (activeRect.length == 0)
    {
        activeRect.push(currentRect);
        console.log(currentRect);
    }
    else if (isAdjacent(activeRect[0], currentRect))
    {
        swap(grid, activeRect[0], currentRect);
        if ( !hasChains(grid))
            {
                swap(grid, activeRect[0], currentRect);
                activeRect = [];
            }
        updateGrid(grid);
        activeRect = [];
    }
    else
        {
            activeRect = [];
        }
}

//########REST########
function fillEmptyRect(grid)
{
    for (let i = 0; i < grid[0].length; i++)
    {
        for (let j = 0; j < grid.length; j++)
        {
            if (grid[i][j] == "")
                grid[i][j] = getRandomColor();
        }
    }
}

function getRandomColor()
{
    var r = Math.floor(random(5));

    if (r == 0)
        return "green";
    if (r == 1)
        return "red";
    if (r == 2)
        return "blue";
    if (r == 3)
        return "yellow";
    if (r == 4)
        return "purple";
}

function getRectIndexAtLocation(position)
{
    let xCoord = Math.floor((position.x / distanceBetweenRect));
    let yCoord = Math.floor((position.y / distanceBetweenRect));
    if(xCoord < grid[0].length && yCoord < grid.length)
        return {x: Math.abs(xCoord), y: Math.abs(yCoord)};
}

function swap(grid, p, q)
{
    let temp = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = temp

    /**if ( !hasChains(grid) )
     {
            let temp = grid[p.y][p.x];
            grid[p.y][p.x] = grid[q.y][q.x];
            grid[q.y][q.x] = temp;
        }**/

}

function isAdjacent(p, q)
{
    return (Math.abs((p.x - q.x) + (p.y - q.y)) == 1);
}

function horizontalChainAt(grid, position)
{
    let result = 1;

    for (let i = position.x - 1; i >= 0; i--)
    {
        if (grid[position.y][position.x] == grid[position.y][i])
            result++;
        else
            break;
    }

    for (let i = position.x + 1; i <= grid[0].length - 1; i++)
    {
        if (grid[position.y][position.x] == grid[position.y][i])
            result++;
        else
            break;
    }


    return result;
}

function verticalChainAt(grid, position)
{
    let result = 1;

    for (let i = position.y - 1; i >= 0; i--)
    {
        if (grid[position.y][position.x] == grid[i][position.x])
            result++;
        else
            break;
    }

    for (let i = position.y + 1; i <= grid.length - 1; i++)
    {
        if (grid[position.y][position.x] == grid[i][position.x])
            result++;
        else
            break;
    }


    return result;
}

function hasChains(grid)
{
    for (let i = 0; i < grid[0].length; i++)
    {
        for (let j = 0; j < grid.length; j++)
        {
            if (horizontalChainAt(grid, {x: i, y: j}) >= 3 || verticalChainAt(grid, {x: i, y: j}) >= 3)
            {
                return true;
            }
        }
    }

    return false;
}

function removeChains(grid)
{
    let positions = [];

    for (let i = 0; i < grid[0].length; i++)
    {
        for (let j = 0; j < grid.length; j++)
        {
            if (horizontalChainAt(grid, {x: i, y: j}) >= 3)
            {
                positions.push({x: i, y: j});
                result += 100;
            }

            if (verticalChainAt(grid, {x: i, y: j}) >= 3)
            {
                positions.push({x: i, y: j});

                result += 100;
            }
        }
    }

    for (let position of positions)
        grid[position.y][position.x] = "";

    document.getElementById("score").innerHTML = result;
}

function collapsePossible(grid)
{
    for (let i = 0; i < grid[0].length; i++)
    {
        for (let j = 0; j < grid.length - 1; j++)
        {
            if (grid[j][i] !== "" && grid[j + 1][i] == "")
                return true;
        }
    }

    return false;
}

function collapse(grid)
{
    while (collapsePossible(grid))
    {
        for (let i = 0; i < grid[0].length; i++)
        {
            for (let j = 0; j < grid.length - 1; j++)
            {
                if (grid[j][i] !== "" && grid[j + 1][i] == "")
                    swap(grid, {x: i, y: j}, {x: i, y: j + 1});
            }
        }
    }
}

function updateGrid(grid)
{
    while (hasChains(grid))
    {
        removeChains(grid);
        collapse(grid);
        fillEmptyRect(grid);
    }

}


//          Timer           //
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};