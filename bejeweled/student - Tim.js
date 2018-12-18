function width(grid)
{
	return grid[0].length;
}

function height(grid)
{
	return grid.length;
}

function isInside(grid, position)
{
	return (position.x <= width(grid) - 1 && position.x >= 0 && position.y <= height(grid) - 1 && position.y >= 0);
}

function swap(grid, p, q)
{
	let temp = grid[p.y][p.x];
	grid[p.y][p.x] = grid[q.y][q.x];
	grid[q.y][q.x] = temp;
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
		
	for (let i = position.x + 1; i <= width(grid) - 1; i++)
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
		
	for (let i = position.y + 1; i <= height(grid) - 1; i++)
	{
		if (grid[position.y][position.x] == grid[i][position.x])
			result++;
		else
			break;
	}
	
	
	return result;
}

function removeChains(grid)
{
	let positions = [];
	let result = {};
	
	for (let i = 0; i < grid[0].length; i++)
	{
		for (let j = 0; j < grid.length; j++)
		{
			if (horizontalChainAt(grid, {x: i, y: j}) >= 3)
				{
					positions.push({x: i, y: j});
					
					if (grid[j][i] in result)
						result[grid[j][i]]++;
					else
						result[grid[j][i]] = 1;
				}	

			if (verticalChainAt(grid, {x: i, y: j}) >= 3)
				{
					positions.push({x: i, y: j});
					
					if (grid[j][i] in result)
						result[grid[j][i]]++;
					else
						result[grid[j][i]] = 1;
				}
		}
	}
	
	for (let position of positions)
		grid[position.y][position.x] = "";
	
	return result;
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