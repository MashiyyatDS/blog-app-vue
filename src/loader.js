import Swal from 'sweetalert2'

function showLoader(message) {
  Swal.fire({
    title: message,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false
  })
}

export default showLoader