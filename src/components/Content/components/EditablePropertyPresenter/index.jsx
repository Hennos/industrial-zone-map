import createPresenter from '../createPresenter';

import InputEditableProperty from '../InputEditableProperty';
import SelectEditableProperty from '../SelectEditableProperty';

const EditablePropertyPresenter = createPresenter({
  input: InputEditableProperty,
  select: SelectEditableProperty,
});

export default EditablePropertyPresenter;
