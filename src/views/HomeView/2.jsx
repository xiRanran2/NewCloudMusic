// import React, { useState } from 'react';
import { Field, Popup, Picker } from 'vant';

const CityPicker = () => {
  const [value, setValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const columns = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'];

  const onConfirm = (value) => {
    setValue(value);
    setShowPicker(false);
  };

  return (
    <div>
      <Field
        readonly
        clickable
        label="城市"
        value={value}
        placeholder="选择城市"
        onClick={() => setShowPicker(true)}
      />
      <Popup vModel={showPicker} round position="bottom">
        <Picker
          showToolbar
          columns={columns}
          onCancel={() => setShowPicker(false)}
          onConfirm={onConfirm}
        />
      </Popup>
    </div>
  );
};

export default CityPicker;