#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Project Jupyter.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..example import ExampleWidget


def test_example_creation_blank():
    w = ExampleWidget()
    assert w.value == 'Hello World'
