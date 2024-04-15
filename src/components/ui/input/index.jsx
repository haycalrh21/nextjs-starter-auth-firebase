const Input = ({ label, name, placeholder, type }) => {
	return (
		<div className='flex flex-col'>
			{label && <label htmlFor='{name}'>{label}</label>}

			<input
				type={type}
				name={name}
				id={name}
				placeholder={placeholder}
				className='border rounded-md px-3 py-2'
			/>
		</div>
	);
};

export default Input;
