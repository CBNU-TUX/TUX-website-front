import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//���� ������ ���� �۾��� â�ε�..
function Writing(){
    return (
      <div>
        <input type='text' placeholder="title..." />
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={editor => {
          }}
        />  
        <button>Up!</button>
      </div>
    );
}

export default Writing;