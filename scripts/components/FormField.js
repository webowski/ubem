import { query, queryAll, isMobile } from '../helpers/Common'

// =========================
//  Form fields
// ---------------
export const initFormFields = formFields => {

	formFields.forEach( formField => {
		let input = query('.FormInput', formField)
		let label = query('.FormLabel', formField)

		input.addEventListener('focusin', () => {
			formField.classList.add('has-focus')
		})

		input.addEventListener('focusout', () => {
			formField.classList.remove('has-focus')

			if (input.value) {
				formField.classList.add('has-value')
			} else {
				formField.classList.remove('has-value')
			}
		})

	})
}

let formFields = queryAll('.FormField')

initFormFields(formFields)
