import './combo-box.scss'


const ComboBox = (props: any) => {
    const { fieldName, register, errors, isRequired, options } = props
    return (
        <div className={'comboBox'}>
            <div className={'comboBoxInfo'}>
                <label htmlFor={fieldName}>{fieldName}</label>
                {errors[fieldName] && <p>{errors[fieldName].message}</p>}
            </div>
            <select name={fieldName} {...register(fieldName, {required: {value: isRequired, message: 'Required field'}})}>
                {options.map((option: any) => <option key={option.value} value={option.value}>{option.displayText}</option>)}
            </select>
        </div>
    );
};
export default ComboBox;
