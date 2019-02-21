# vana-multi-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## version
vue-cli 3.0으로 프로젝트 구성  
vue : 2.5.22  
typescript : 3.0.0

## 프로젝트 폴더 구조

```
src/
|
|- main.ts
|- router.ts
|- assets
|- components/
|   |- CommonModal.vue
|   |- ImageCropper.vue
|   |- TodoInput.vue
|   |- TodoList.vue
|   ...    
|
|- model/
|   |- todo.ts
|   ...
|
|- views/
|   |- ImageView.vue
|   |- TodoView.vue
|   ...       
|
|- App.vue (Main App)
|
```

## pages

- Todo : 할일 등록 (등록, 삭제, 완료 체크 기능)
- Image : 썸네일 등록 (vue-cropperjs 사용)

### 레이아웃 구조
```

- Todo  - TodoView.vue
            |- TodoInput.vue
            |- TodoList.vue

- Image - ImageView.vue 
            |- CommonModal.vue
            |- ImageCropper.vue 
                |- VueCropper
```

## 라우팅

화면 이동은 router-link to로 이동하며,
  '/' path로 호출되는 경우 '/todo' 화면으로 redirect 한다.