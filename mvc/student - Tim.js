function onMouseDown(state, args)
{
	state += 1;
	return state;
}

function onMouseDown2(state, args)
{
	return { count: state.count + 1};
}

function counter3()
{
	function onMouseDown(state, args)
	{
		return { count: state.count + 1};
	}
	
	return { controller: { onMouseDown }};
}

function counter4()
{
	function onMouseDown(state, args)
	{
		return { count: state.count + 1};
	}
	
	function onKeyDown(state, args)
	{
		return { count: 0};
	}
	
	return { controller: {onMouseDown, onKeyDown} };
}


function counter5(state, args)
{
	function onMouseDown(state, args)
	{
		if (args.shift == true)
		{
			if (state.count > 0)
				return { count: state.count - 1};
			else
				return { count: state.count };
		}
		else
			return { count: state.count + 1};
	}
	
	function onKeyDown(state, args)
	{
		if (args.key == "ArrowUp")
			return { count: state.count + 1};
		
		else if (args.key == "ArrowDown")
		{
			if (state.count > 0)
				return { count: state.count - 1};
			else
				return { count : 0 };
		}
		
		else if (args.key == "0")
			return { count : 0 };
		
		else
			return { count : state.count};
		
	}
	
	return {controller: { onMouseDown, onKeyDown } };
	
	return args;
}

function counter6() {
    function increment(state) 
	{
		return { count: state.count + 1};
	}

    function decrement(state)
	{
		if (state.count > 0)
			return { count: state.count - 1};
		else
			return { count: 0};
	}

    function reset(state) 
	{
		return { count: 0};
	}

    function onMouseDown(state, args) 
	{
		if (args.shift == true)
			return decrement(state);
		else
			return increment(state);
	}

    function onKeyDown(state, args) 
	{
		if (args.key == "ArrowUp")
			return increment(state);
		
		else if (args.key == "ArrowDown")
			return decrement(state);
		
		else if (args.key == "0")
			return reset(state);
		
		else if (args.key == " ")
			return increment(state);
		else
			return state;
	}

    const controller = { onMouseDown, onKeyDown };
    const model = { increment, decrement, reset };
    return { controller, model };
}

function counter7()
{
	function add(state, value) 
	{
		if (state.count >= -value)
			return { count: state.count + value};
		else
			return { count: 0};
	}

    function reset(state) 
	{
		return { count: 0};
	}
	
	function onMouseDown(state, args) 
	{
		let value = 0;
		
		if (args.ctrl == true)
			value += 5;
		else 
			value += 1;
		
		if (args.shift == true)
			return add(state, -value);
		else
			return add(state, value);
	}
	
	function onKeyDown(state, args) 
	{
		let value = 0;
		if (args.ctrl == true)
			value += 5;
		else
			value += 1;

		if (args.key == "ArrowUp")
			return add(state, value);
		
		else if (args.key == "ArrowDown")
			return add(state, -value);
		
		else if (args.key == "0")
			return reset(state);
		
		else if (args.key == " ")
			return add(state, value);
		else
			return state;
	}
	
	const model = { add, reset };
	const controller = { onMouseDown, onKeyDown };
	return { controller, model};
}

function chronometer()
{
	function timePassed(state, dt)
	{
		return { elapsedTime: state.elapsedTime + dt};
	}
	
	function onTimerTick(state, dt)
	{
		return timePassed(state, dt);
	}
	
	const controller = { onTimerTick };
	const model = { timePassed };
	return { controller, model };
}

function chronometer2()
{
	function timePassed(state, dt)
	{
		if (state.active == true)
			return { elapsedTime: state.elapsedTime + dt, active: true};
		else
			return { elapsedTime: state.elapsedTime, active: false};
	}
	
	function toggle(state)
	{
		if (state.active == true)
			return { elapsedTime: state.elapsedTime, active: false};
		else
			return { elapsedTime: state.elapsedTime, active: true};
	}
	
	function reset(state)
	{
		return {elapsedTime: 0, active: state.active};
	}
	
	function onTimerTick(state, dt)
	{
		return timePassed(state, dt);
	}
	
	function onKeyDown(state, args)
	{
		if (args.key == " ")
			return toggle(state);
		if (args.key == "0")
			return reset(state);
	}
	
	const model = { timePassed, toggle, reset };
	const controller = { onTimerTick, onKeyDown };
	return { controller, model };
}

function circle()
{
	function render(state)
	{
		return [{ type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"}];		
	}
	
	const view = {render};
	const model = {};
	const controller = {};
	return {view, model, controller };
}

function circle2()
{
	function moveTo(state, position)
	{
		return { position: {x: position.x, y: position.y}};
	}
	
	function onMouseDown(state, args)
	{
		return moveTo(state, args.position);
	}
	
	function render(state)
	{
		return [{type: "circle", center: state.position, radius: 10, color: "red"}];
	}
	
	const view = {render};
	const model = {moveTo};
	const controller = {onMouseDown};
	return {view, model, controller};
}

function circle3()
{
	function moveTo(state, position)
	{
		return { position: position};
	}
	
	function onMouseMove(state, args)
	{
		return moveTo(state, args.position);
	}
	
	function render(state)
	{
		return [{type: "circle", center: state.position, radius: 10, color: "red"}];
	}
	
	const view = {render};
	const model = {moveTo};
	const controller = {onMouseMove};
	return {view, model, controller};
}

function drawing()
{
	function moveTo(state, position)
	{
		if (state.addMode == true)
		{
			return {position: position, dots: state.dots.concat(position) , addMode: true};
		}
		else
			return {position: position, dots: state.dots, addMode: false};
	}
	
	function setAddMode(state, addMode)
	{
		return {position: state.position, dots: state.dots, addMode: addMode};	
	}
	
	function onMouseMove(state, args)
	{
		return moveTo(state, args.position);
	}
	
	function onMouseDown(state, args)
	{
		return setAddMode(state, true);
	}
	
	function onMouseUp(state, args)
	{
		return setAddMode(state, false);
	}
	
	function render(state)
	{
		let result = [];
		let newRadius = 2;
		
		for (let dot of state.dots)
			result.push({type: "circle", center: {x: dot.x, y: dot.y}, radius: newRadius, color: "green"});
		
		if (state.addMode == false)
			newRadius = 5;
		
		result.push({type: "circle", center: state.position, radius: newRadius, color: "red"});
		
		return result;
	}
	
	const view = {render};
	const model = {moveTo, setAddMode};
	const controller = {onMouseMove, onMouseDown, onMouseUp};
	return {view, model, controller};
}

function random()
{
	function throwDie(state)
	{
		let newRng = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693;
		return {rng: newRng, dieValue: (newRng % 6) + 1};
	}
	
	function onKeyDown(state, args)
	{
		if (args.key == " ")
			return throwDie(state);
	}
	
	function render(state)
	{
	return [{type: "text", position: {x: 50, y: 50}, string: state.dieValue.toString()}];
	}
	const view = {render};
	const model = {throwDie};
	const controller = {onKeyDown};
	return {view, model, controller};
}

function random2()
{
	function nextRandom(n)
	{
		return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
	}
	
	function throwDie(state)
	{
		return [(nextRandom(state.rng) % 6) + 1, {rng: nextRandom(state.rng), grade: state.grade}];
	}
	
	function generateGrade(state)
	{
		let resultGrade = 0;
		
		for (let i = 0; i !== 3; i++)
		{
			let newThrow = throwDie(state);
			resultGrade += newThrow[0];
			state = newThrow[1];
		}
		
		return {rng: state.rng, grade: resultGrade};
	}
	
	function onKeyDown(state, args)
	{
		if (args.key == " ")
			return generateGrade(state);
	}
	
	function render(state)
	{
		return [{type: "text", position: {x: 50, y: 50}, string: state.grade.toString()}];
	}
	
	const view = {render};
	const model = {nextRandom, throwDie, generateGrade};
	const controller = {onKeyDown};
	return {view, model, controller};
}

function whack()
{
	function distance(p, q)
	{
		return (Math.sqrt(Math.pow((p.x - q.x), 2) + Math.pow(p.y - q.y, 2)));
	}
	
	function nextRandomNumber(n)
	{
		return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
	}
	
	function shrinkMole(mole, amount)
	{
		let newSize = Math.max(0, mole.size - amount);
		return {position: mole.position, size: newSize};
	}
	
	function shrinkMoles(moles, amount)
	{
		let result = [];
		
		for (let mole of moles)
		{
			let newMole = shrinkMole(mole, amount);
			result.push(newMole);
		}
		
		return result;
	}
	
	function removeZeroSizedMoles(moles)
	{
		let result = [];
		
		for (let mole of moles)
			if (mole.size > 0)
				result.push(mole);
			
		return result;
	}
	
	function createMole(rng)
	{
		let a = nextRandomNumber(rng);
		let b = nextRandomNumber(a);
		let c = nextRandomNumber(b);
		
		let xPos = a % 500;
		let yPos = b % 500;
		let newSize = (c % 25) + 5;
		
		return [{position: {x: xPos, y: yPos}, size: newSize}, c];
	}
	
	function replenishMoles(moles, rng)
	{
		let result = [];
		
		for (let mole of moles)
			result.push(mole);
		
		while (result.length < 3)
		{
			let newMole = createMole(rng)[0];
			rng = createMole(rng)[1];
			result.push(newMole);
		}
		
		return [result, rng];
	}
	
	function findMoleAt(moles, position)
	{
		for (let i = 0; i !== moles.length; i++)
			if (distance(moles[i].position, position) < moles[i].size)
				return i;
		
		return -1;
	}
	
	function removeMoleWithIndex(moles, index)
	{
		let result = [];
		
		for (let i = 0; i !== moles.length; i++)
			if (i !== index)
				result.push(moles[i]);
			
		return result;
	}
	
	function hit(state, position)
	{
		if (state.health == 0)
			return state;
		
		let moleIndex = findMoleAt(state.moles, position);
		
		if (moleIndex == -1)
		{
			let newHealth = Math.max(0, state.health - 5);
			return {moles: state.moles, rng: state.rng, timeLasted: state.timeLasted, health: newHealth};
		}
		else
		{
			let newHealth = state.health + 5;
			let newMoles = removeMoleWithIndex(state.moles, moleIndex);
			let newRng = replenishMoles(newMoles, state.rng)[1];
			newMoles = replenishMoles(newMoles, state.rng)[0];
			return {timeLasted: state.timeLasted, health: newHealth, moles: newMoles, rng: newRng};
		}
	}
	
	function advanceTime(state, dt)
	{
		if (state.health == 0)
			return state;
		
		let newMoles = shrinkMoles(state.moles, 10 * dt);
		newMoles = removeZeroSizedMoles(newMoles);
		let newRng = replenishMoles(newMoles, state.rng)[1];
		newMoles = replenishMoles(newMoles, state.rng)[0];
		
		let newHealth = Math.max(0, state.health - 10 * dt);
		let newTimeLasted = state.timeLasted + dt;
		
		return {timeLasted: newTimeLasted, health: newHealth, moles: newMoles, rng: newRng};
	}
	
	function onTimerTick(state, dt)
	{
		return advanceTime(state, dt);
	}
	
	function onMouseDown(state, args)
	{
		return hit(state, args.position);
	}

	function render(state)
	{
		let result = [];
		
		for (let mole of state.moles)
			result.push({type: "circle", center: mole.position, radius: mole.size, color: "red"});
		
		result.push({type: "text", position: {x: 250, y: 490}, string: state.timeLasted.toFixed(3).toString()});
		
		result.push({type: "text", position: {x: 250, y: 20}, string: state.health.toString()});
		
		return result;
	}
	
	const model = {distance, nextRandomNumber, shrinkMole, shrinkMoles, removeZeroSizedMoles, createMole, replenishMoles, findMoleAt, removeMoleWithIndex, hit, advanceTime};
	const controller = {onTimerTick, onMouseDown};
	const view = {render};
	
	return {view, model, controller};
}