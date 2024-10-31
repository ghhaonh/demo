from rest_framework.permissions import BasePermission

class IsStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff == True