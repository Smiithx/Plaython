# Plaython Architecture Diagrams

This document provides architecture diagrams for the Plaython project to help developers understand the system structure and component interactions.

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Component Architecture](#component-architecture)
3. [Data Flow](#data-flow)
4. [Authentication Flow](#authentication-flow)
5. [Challenge Registration Flow](#challenge-registration-flow)

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js Server                          │
│                                                                 │
│  ┌─────────────────┐    ┌──────────────────┐    ┌────────────┐  │
│  │  React Server   │    │  Server Actions  │    │   API      │  │
│  │  Components     │    │  & Functions     │    │   Routes   │  │
│  └─────────────────┘    └──────────────────┘    └────────────┘  │
│                                                                 │
└───────────────┬─────────────────────┬───────────────────────────┘
                │                     │
    ┌───────────▼───────────┐ ┌──────▼───────┐
    │                       │ │              │
┌───▼───────────────┐ ┌─────▼─┴──────────┐   │
│                   │ │                  │   │
│  Clerk Auth       │ │  Supabase        │   │
│  (Authentication) │ │  (Database)      │   │
│                   │ │                  │   │
└───────────────────┘ └──────────────────┘   │
                                             │
                      ┌─────────────────────▼┐
                      │  External Services   │
                      │  (if any)            │
                      └──────────────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Application Structure                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
┌───────────────▼───┐ ┌─────────▼────────┐ ┌───▼───────────────┐
│   Pages (src/app)  │ │  Components     │ │  Shared           │
│                    │ │                 │ │                    │
│ ┌────────────────┐ │ │ ┌─────────────┐ │ │ ┌──────────────┐  │
│ │ Public Pages   │ │ │ │ UI          │ │ │ │ Contexts     │  │
│ │                │ │ │ │             │ │ │ │              │  │
│ │ - Home         │ │ │ │ - Button    │ │ │ │ - User       │  │
│ │ - Challenges   │ │ │ │ - Input     │ │ │ │ - Challenges │  │
│ │ - Auth         │ │ │ │ - Tabs      │ │ │ │ - Teams      │  │
│ └────────────────┘ │ │ │ - etc.      │ │ │ │ - Error      │  │
│                    │ │ └─────────────┘ │ │ └──────────────┘  │
│ ┌────────────────┐ │ │                 │ │                    │
│ │ Protected Pages│ │ │ ┌─────────────┐ │ │ ┌──────────────┐  │
│ │                │ │ │ │ Challenge   │ │ │ │ Hooks        │  │
│ │ - Dashboard    │ │ │ │             │ │ │ │              │  │
│ │ - Challenge    │ │ │ │ - Card      │ │ │ │ - useFetch   │  │
│ │   Details      │ │ │ │ - Detail    │ │ │ │ - useChallenge│  │
│ │ - Teams        │ │ │ │ - Tabs      │ │ │ │ - etc.       │  │
│ └────────────────┘ │ │ └─────────────┘ │ │ └──────────────┘  │
│                    │ │                 │ │                    │
│                    │ │ ┌─────────────┐ │ │ ┌──────────────┐  │
│                    │ │ │ Dashboard   │ │ │ │ Services     │  │
│                    │ │ │             │ │ │ │              │  │
│                    │ │ │ - Header    │ │ │ │ - Challenges │  │
│                    │ │ │ - Sidebar   │ │ │ │ - Teams      │  │
│                    │ │ │ - Stats     │ │ │ │ - Users      │  │
│                    │ │ └─────────────┘ │ │ └──────────────┘  │
└────────────────────┘ └─────────────────┘ └────────────────────┘
```

## Data Flow

```
┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │
│  UI          │     │  State        │     │  Server       │
│  Components  │◄────┤  Management   │◄────┤  Actions      │
│              │     │  (Contexts)   │     │               │
│              │     │               │     │               │
└──────┬───────┘     └───────┬───────┘     └───────┬───────┘
       │                     │                     │
       │                     │                     │
       │                     │                     │
       │                     │                     │
       │                     ▼                     │
       │             ┌───────────────┐             │
       │             │               │             │
       └────────────►│  Hooks        │◄────────────┘
                     │               │
                     │               │
                     └───────┬───────┘
                             │
                             │
                             ▼
                     ┌───────────────┐
                     │               │
                     │  Services     │
                     │               │
                     │               │
                     └───────┬───────┘
                             │
                             │
                             ▼
                     ┌───────────────┐
                     │               │
                     │  Supabase     │
                     │  Database     │
                     │               │
                     └───────────────┘
```

## Authentication Flow

```
┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │
│  User        │────►│  Clerk        │────►│  JWT Token    │
│  Login/Signup│     │  Auth         │     │               │
│              │     │               │     │               │
└──────────────┘     └───────────────┘     └───────┬───────┘
                                                   │
                                                   │
                                                   ▼
┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │
│  Protected   │◄────┤  Middleware   │◄────┤  Token        │
│  Routes      │     │  Check        │     │  Validation   │
│              │     │               │     │               │
└──────────────┘     └───────────────┘     └───────────────┘
```

## Challenge Registration Flow

```
┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │
│  User        │────►│  Challenge    │────►│  Server       │
│  Interface   │     │  Detail Page  │     │  Action       │
│              │     │               │     │               │
└──────────────┘     └───────────────┘     └───────┬───────┘
                                                   │
                                                   │
                                                   ▼
┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │
│  Group       │◄────┤  Team         │◄────┤  Registration │
│  Assignment  │     │  Formation    │     │  Database     │
│              │     │  Algorithm    │     │  Entry        │
│              │     │               │     │               │
└──────────────┘     └───────────────┘     └───────────────┘
```

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Challenge Detail Page                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
┌───────────────▼───┐ ┌─────────▼────────┐ ┌───▼───────────────┐
│ ChallengeHeader    │ │ Tabs Component   │ │ Sidebar          │
└───────────────────┬┘ └─────────┬────────┘ └───┬───────────────┘
                    │            │              │
                    │  ┌─────────┴──────────────┴───────────┐
                    │  │                                    │
                    │  ▼                                    ▼
┌───────────────────┴──┐ ┌────────────────┐ ┌───────────────────┐
│ InfoTab              │ │ ParticipantsTab│ │ SignedInSidebar   │
└────────────────────┬─┘ └────────┬───────┘ └───┬───────────────┘
                     │            │              │
                     │            │              │
                     ▼            ▼              ▼
┌─────────────────────┐ ┌────────────────┐ ┌───────────────────┐
│ ScheduleTab         │ │ DiscussionTab  │ │ Registration      │
└─────────────────────┘ └────────────────┘ │ Actions           │
                                           └───────────────────┘
```

These diagrams provide a visual representation of the Plaython architecture. They are meant to help developers understand the system structure and component interactions at a high level.

For more detailed information about specific components or flows, please refer to the corresponding documentation files:

- [State Management Documentation](./state-management.md)
- [Error Handling Documentation](./error-handling.md)
- [Server vs. Client Components](./server-client-components.md)
- [API Documentation](./api-documentation.md)