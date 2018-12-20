var grid;
var activeRect = [];
var score;
var highscore;
const distanceBetweenRect = 50;
const sizeRect = 49;


// ########SETUP########
function setup() {
    var cnv = createCanvas(600, 600);
    cnv.parent("canvas");
    grid = createEmptyGrid(12);
    fillEmptyRect(grid);
    updateGrid(grid);
    result = 0;
    score = 0;
    document.getElementById("score").innerHTML = score;
    highscore = 0;
    document.getElementById("highscore").innerHTML = highscore;
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
    if(clicked) {
        var currentRect = getRectIndexAtLocation({x: mouseX, y: mouseY});

        if (currentRect == undefined)
            return;

        if (activeRect.length == 0) {
            activeRect.push(currentRect);
            selectCurrentRect(activeRect[0]);
        }
        else if (isAdjacent(activeRect[0], currentRect)) {
            selectCurrentRect(activeRect[0]);
            swap(grid, activeRect[0], currentRect);
            if (!hasChains(grid)) {
                swap(grid, activeRect[0], currentRect);
                activeRect = [];
                return;
            }
            updateGrid(grid);
            activeRect = [];
        }
        else {
            selectCurrentRect(activeRect[0]);
            activeRect = [];
        }
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
        return "#099102";
    if (r == 1)
        return "#F80101";
    if (r == 2)
        return "#0101F8";
    if (r == 3)
        return "#F8F801";
    if (r == 4)
        return "#9B01EE";
}

function getRectIndexAtLocation(position)
{
    let xCoord = Math.floor((position.x / distanceBetweenRect));
    let yCoord = Math.floor((position.y / distanceBetweenRect));
    if(xCoord >= 0 && yCoord >= 0 && xCoord < grid[0].length && yCoord < grid.length)
        return {x: Math.abs(xCoord), y: Math.abs(yCoord)};
}

function selectCurrentRect(currentRect)
{
    switch (grid[currentRect.y][currentRect.x])
        {
            case "#099102":
                grid[currentRect.y][currentRect.x] = "#66F966";
                break;
            case "#F80101":
                grid[currentRect.y][currentRect.x] = "#FF3D3D";
                break;
            case "#0101F8":
                grid[currentRect.y][currentRect.x] = "#6358FD";
                break;
            case "#F8F801":
                grid[currentRect.y][currentRect.x] = "#FCF268";
                break;
            case "#9B01EE":
                grid[currentRect.y][currentRect.x] = "#C357FE";
                break;
            case "#66F966":
                grid[currentRect.y][currentRect.x] = "#099102";
                break;
            case "#FF3D3D":
                grid[currentRect.y][currentRect.x] = "#F80101";
                break;
            case "#6358FD":
                grid[currentRect.y][currentRect.x] = "#0101F8";
                break;
            case "#FCF268":
                grid[currentRect.y][currentRect.x] = "#F8F801";
                break;
            case "#C357FE":
                grid[currentRect.y][currentRect.x] = "#9B01EE";
                break;
            default:
                return;
        }
}

function swap(grid, p, q)
{
    let temp = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = temp
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
                score += 100;
            }

            if (verticalChainAt(grid, {x: i, y: j}) >= 3)
            {
                positions.push({x: i, y: j});

                score += 100;
            }
        }
    }

    for (let position of positions)
        grid[position.y][position.x] = "";

    document.getElementById("score").innerHTML = score;
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
var clicked = false;
var sec;

function startClock()
{
    if (clicked === false)
    {
        sec = 300;
        score = 0;
        document.getElementById("score").innerHTML = score;
        clock = setInterval("countdown()", 1000);
        clicked = true;
    }
}

function countdown()
{
    sec--;
    if (sec === 0)
    {
        stopClock();
    }
    else
    {
        if(sec < 10)
        {
            document.getElementById("timer").innerHTML = "Time left: 0" + Math.floor(sec / 60) + ":0" + (sec % 60);
        }
        else
        {
            document.getElementById("timer").innerHTML = "Time left: 0" + Math.floor(sec / 60) + ":" + (sec % 60);
        }
    }
}

function stopClock()
{
    window.clearInterval(clock);
    document.getElementById("timer").innerHTML = "Out of time!";
    if(score > highscore)
    {
        highscore = score;
    }
    document.getElementById("highscore").innerHTML = highscore;
    clicked = false;
}