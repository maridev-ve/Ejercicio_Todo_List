# Ejercicio: TODO List

Haciendo uso de useState, crea una TODO list que contenga lo siguiente:

## Fase 1

- [x] Un formulario con input + botón
- [x] Un componente List que recorra listas de items
- [x] Un componente Item o Card que contenga cada TO-DO
- [x] Botón CLEAR para borrar todas las tareas
- [x] Botón BORRAR, asociado a cada tarea, para poder borrar de manera independiente
- [x] Botón para hacer RESET de las tareas
- [x] Dar estilo CSS a los componentes con lo visto en clase para practicar

### Flujo de la aplicación

- [x] Nada más empezar tendremos un input y un botón. El botón tendrá el texto ADD
- [x] Si hemos escrito algo en el input y hacemos click sobre el botón ADD, se añadirá un item debajo del input.
- [x] Se debe hacer una precarga de tareas de un JSON de datos
- [x] El botón de RESET mostrará de nuevo sólo las tareas obtenidas de la precarga de datos
- [X] Cuando un item sea añadido, se borrará inmediatamente lo que habíamos escrito en el input y desaparecerá el botón ADD.

**TIP:** usad el paquete de NPM UUID para manejar las keys de los diferentes elementos de la lista.

- [UUID](https://www.npmjs.com/package/uuid)
- Sobre formularios

## Fase 2

- [x] Hasta que no haya texto no aparecerá el botón ADD
- [X] La precarga de datos se debe hacer usando el lifecycle
- [X] Si pasados 20 segundos no envias la tarea que has escrito, se vaciará el input y desaparecerá ADD
- [X] Cuando haya sido añadida una tarea se mostrará durante 5 segundos el mensaje "tarea añadida" y luego desaparecerá
- [X] Validación: La tarea introducida en el input debe tener al menos 6 caracteres. En caso contrario debe aparecer un mensaje de error

## Fase 3

- [] Editar tarea. Al hacer clic en el botón de edición de una tarea, se debe abrir un formulario prellenado con el título y el contenido de la tarea seleccionado. El usuario puede editar la tarea y guardar los cambios.
- [ ] Tachar o Eliminar tareas. Añade funcionalidades para marcar las tareas como completadas (tachar) o eliminarlas.

💡 Pista: El estado podría ser un array de objetos, algo así:

```
{
  title: 'Tarea',
  desc: ' Descripción'
  isDone: false,
  _id: 1,
}
```

- [X] División en Componentes. Para una mejor organización y reutilización del código, divide tu aplicación en componentes más pequeños y manejables.
- [ ] Despliegue de tu app en Netlify. En ese caso, la versión final deberá estar en la rama main. https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/
