let statElements = document.body.querySelectorAll('.do-statYa')

statElements.forEach(element => {
	let goal = element.dataset.goal
	let targetEvent = 'click'

	if (element.tagName === 'SELECT') targetEvent = 'change'

	element.addEventListener(targetEvent, e => {
		if (window.yaCounter65724 !== undefined) {
			yaCounter65724.reachGoal(goal)
		}
		return true
	})

})

// class="do-statYa" data-goal="{'click', 'OPENLS'}"
