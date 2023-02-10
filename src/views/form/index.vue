<template>
  <MForm ref="form"
    label-width="100px" 
    :options="options"
    @onPreview="onPreview"
    @onRemove="onRemove"
    @onSuccess="onSuccess"
    @onError="onError"
    @onProgress="onProgress"
    @onChange="onChange"
    @onExceed="onExceed"
    @beforeUpload="beforeUpload"
    @beforeRemove="beforeRemove"
  >
    <!-- v-upload专用 -->
    <template #uploadArea>
      <el-button type="primary">上传文件</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
    </template>

    <template #action="{form, model}">
      <el-button type="primary" @click="submitForm(form, model)">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </template>
  </MForm>
</template>


<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { FormInstance } from 'element-plus/lib/components';
import { ref, reactive } from 'vue';
import { FormOptions } from '../../components/form/src/types/type';

const form = ref<FormInstance>()

const options = reactive<FormOptions[]>([
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      }, {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      style: {width: '300px'},
      clearable: true
    }
  }, {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }, {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      style: {width: '300px'},
      showPassword: true,
      clearable: true
    }
  }, {
    type: 'select',
    value: 3,
    label: '职位',
    placeholder: '请选择职位',
    prop: 'role',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blur'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: 1
      }, {
        type: 'option',
        label: '员工',
        value: 2
      },      {
        type: 'option',
        label: '主管',
        value: 3
      },
    ],
    attrs: {
      style: {width: '300px'},
    }
  }, {
    type: 'checkbox-group',
    value: [],
    label: '爱好',
    prop: 'Hobby',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'blur'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: 1
      }, {
        type: 'checkbox',
        label: '篮球',
        value: 2
      }, {
        type: 'checkbox',
        label: '羽毛球',
        value: 3
      }
    ],
  }, {
    type: 'radio-group',
    value: '',
    label: '性别',
    prop: 'gender',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'blur'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      }, {
        type: 'radio',
        label: '女',
        value: 'female'
      }, {
        type: 'radio',
        label: '保密',
        value: 'secret'
      }
    ],
  }, {
    type: 'upload',
    label: '上传文件',
    prop: 'pic',
    // httpRequest: ()=>{},
    rules: [
      {
        required: true,
        message: '请上传文件',
        trigger: 'blur'
      }
    ],
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      // autoUpload: false,
      multiple: true,
      limit: 3
    }
  }, {
    type: 'editor',
    value: '<p>123</p>',
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '请添加描述内容',
        trigger: 'blur'
      }
    ],
  }
])

const submitForm =(form:FormInstance, model:any)=>{
  form.validate(valid=>{
    if(valid) {
      console.log('model=>', model);
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('提交失败')
    }
  })
}
const resetForm =()=>{
  form.value!.resetFields()
}

// v-upload专用方法
const onChange = (val:any) =>{
  console.log('onChange=>', val.file, val.fileList);
}
const beforeUpload = (file:any) =>{
  console.log('beforeUpload=>', file);
}
const onPreview = (file:any) =>{
  console.log('onPreview=>', file);
}
const beforeRemove = (val:any) =>{
  console.log('beforeRemove>', val.file, val.fileList);
}
const onRemove = (val:any) =>{
  console.log('onRemove=>', val.file, val.fileList);
}
const onProgress= (val:any) =>{
  console.log('onProgress=>', val.event, val.file, val.fileList);
}
const onSuccess = (val:any) =>{
  console.log('onSuccess=>', val.response, val.file, val.fileList);
}
const onError = (val:any) =>{
  console.log('onError=>', val.err, val.file, val.fileList);
}
const onExceed = (val:any) =>{
  ElMessage.warning(`上传的文件${val.files.length}个，超出限制`);
}

</script>


<style lang="scss" scoped>

.el-upload__tip {
  font-size: 12px;
  color: #ccc;
  margin-top: 7px;
}
  
</style>