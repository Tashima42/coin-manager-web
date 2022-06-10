import './combo-box.scss'


const ComboBox = (props: any) => {
    const { fieldName, register, errors, isRequired, options, readonly, onChange } = props
    return (
        <div className={'comboBox'}>
            <div className={'comboBoxInfo'}>
                <label htmlFor={fieldName}>{fieldName}</label>
                {errors[fieldName] && <p>{errors[fieldName].message}</p>}
            </div>
            <select 
              className={ readonly === true ? "select-readonly" : null }
              readOnly={readonly === true ? "readonly": null} 
              name={fieldName} 
              {...register(fieldName, {required: {value: isRequired, message: 'Required field'}})}
              onChange={(e) => onChange(e)}
            >
              {options.map((option: any, id: number) => <option key={id} value={option.value}>{option.displayText}</option>)}
            </select>
        </div>
    );
};
export default ComboBox;
