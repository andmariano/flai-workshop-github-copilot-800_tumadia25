import os
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from octofit_tracker.views import (
    api_root,
    UserViewSet,
    TeamViewSet,
    ActivityViewSet,
    LeaderboardViewSet,
    WorkoutViewSet,
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', WorkoutViewSet, basename='workout')

# Build the base URL from the $CODESPACE_NAME environment variable so that
# all API links resolve to the correct Codespace HTTPS endpoint:
#   https://<CODESPACE_NAME>-8000.app.github.dev/api/[component]/
codespace_name = os.environ.get('CODESPACE_NAME', '')
if codespace_name:
    base_url = f'https://{codespace_name}-8000.app.github.dev'
else:
    base_url = 'http://localhost:8000'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]
