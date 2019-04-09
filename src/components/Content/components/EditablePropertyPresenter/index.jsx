import createPresenter from '../createPresenter';

import InputEditableProperty from '../InputEditableProperty';
import SelectEditableProperty from '../SelectEditableProperty';
import PhotosEditableProperty from '../PhotosEditableProperty';

const EditablePropertyPresenter = createPresenter({
  input: InputEditableProperty,
  text: InputEditableProperty,
  email: InputEditableProperty,
  select: SelectEditableProperty,
  photos: PhotosEditableProperty
});

export default EditablePropertyPresenter;
